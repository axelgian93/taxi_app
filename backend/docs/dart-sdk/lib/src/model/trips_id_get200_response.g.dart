// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_id_get200_response.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsIdGet200Response extends TripsIdGet200Response {
  @override
  final bool? ok;
  @override
  final TripsIdGet200ResponseTrip? trip;

  factory _$TripsIdGet200Response(
          [void Function(TripsIdGet200ResponseBuilder)? updates]) =>
      (TripsIdGet200ResponseBuilder()..update(updates))._build();

  _$TripsIdGet200Response._({this.ok, this.trip}) : super._();
  @override
  TripsIdGet200Response rebuild(
          void Function(TripsIdGet200ResponseBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsIdGet200ResponseBuilder toBuilder() =>
      TripsIdGet200ResponseBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsIdGet200Response &&
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
    return (newBuiltValueToStringHelper(r'TripsIdGet200Response')
          ..add('ok', ok)
          ..add('trip', trip))
        .toString();
  }
}

class TripsIdGet200ResponseBuilder
    implements Builder<TripsIdGet200Response, TripsIdGet200ResponseBuilder> {
  _$TripsIdGet200Response? _$v;

  bool? _ok;
  bool? get ok => _$this._ok;
  set ok(bool? ok) => _$this._ok = ok;

  TripsIdGet200ResponseTripBuilder? _trip;
  TripsIdGet200ResponseTripBuilder get trip =>
      _$this._trip ??= TripsIdGet200ResponseTripBuilder();
  set trip(TripsIdGet200ResponseTripBuilder? trip) => _$this._trip = trip;

  TripsIdGet200ResponseBuilder() {
    TripsIdGet200Response._defaults(this);
  }

  TripsIdGet200ResponseBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _ok = $v.ok;
      _trip = $v.trip?.toBuilder();
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsIdGet200Response other) {
    _$v = other as _$TripsIdGet200Response;
  }

  @override
  void update(void Function(TripsIdGet200ResponseBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsIdGet200Response build() => _build();

  _$TripsIdGet200Response _build() {
    _$TripsIdGet200Response _$result;
    try {
      _$result = _$v ??
          _$TripsIdGet200Response._(
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
            r'TripsIdGet200Response', _$failedField, e.toString());
      }
      rethrow;
    }
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
