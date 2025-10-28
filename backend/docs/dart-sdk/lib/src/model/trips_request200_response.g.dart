// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_request200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsRequest200Response extends TripsRequest200Response {
  @override
  final bool? ok;
  @override
  final TripsRequest200ResponseTrip? trip;

  factory _$TripsRequest200Response(
          [void Function(TripsRequest200ResponseBuilder)? updates]) =>
      (TripsRequest200ResponseBuilder()..update(updates))._build();

  _$TripsRequest200Response._({this.ok, this.trip}) : super._();
  @override
  TripsRequest200Response rebuild(
          void Function(TripsRequest200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsRequest200ResponseBuilder toBuilder() =>
      TripsRequest200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsRequest200Response &&
        ok == other.ok &&
        trip == other.trip;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, ok.hashCode);
    _$hash = $jc(_$hash, trip.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsRequest200Response')
          ..add('ok', ok)
          ..add('trip', trip))
        .toString();
  }
}

class TripsRequest200ResponseBuilder
    implements
        Builder<TripsRequest200Response, TripsRequest200ResponseBuilder> {
  _$TripsRequest200Response? _$v;

  bool? _ok;
  bool? get ok => _$this._ok;
  set ok(bool? ok) => _$this._ok = ok;

  TripsRequest200ResponseTripBuilder? _trip;
  TripsRequest200ResponseTripBuilder get trip =>
      _$this._trip ??= TripsRequest200ResponseTripBuilder();
  set trip(TripsRequest200ResponseTripBuilder? trip) => _$this._trip = trip;

  TripsRequest200ResponseBuilder() {
    TripsRequest200Response._defaults(this);
  }

  TripsRequest200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _trip = $v.trip?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsRequest200Response other) {
    _$v = other as _$TripsRequest200Response;
  }

  @override
  void update(void Function(TripsRequest200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsRequest200Response build() => _build();

  _$TripsRequest200Response _build() {
    _$TripsRequest200Response _$result;
    try {
      _$result = _$v ??
          _$TripsRequest200Response._(
            ok: ok,
            trip: _trip?.build(),
          );
    } catch (_) {
      late String _$failedField;
      try {
        _$failedField = 'trip';
        _trip?.build();
      } catch (e) {
        throw BuiltValueNestedFieldError(
            r'TripsRequest200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
