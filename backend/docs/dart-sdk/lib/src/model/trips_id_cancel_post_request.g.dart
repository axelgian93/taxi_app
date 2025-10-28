// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_id_cancel_post_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsIdCancelPostRequest extends TripsIdCancelPostRequest {
  @override
  final String? reason;

  factory _$TripsIdCancelPostRequest(
          [void Function(TripsIdCancelPostRequestBuilder)? updates]) =>
      (TripsIdCancelPostRequestBuilder()..update(updates))._build();

  _$TripsIdCancelPostRequest._({this.reason}) : super._();
  @override
  TripsIdCancelPostRequest rebuild(
          void Function(TripsIdCancelPostRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsIdCancelPostRequestBuilder toBuilder() =>
      TripsIdCancelPostRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsIdCancelPostRequest && reason == other.reason;
  }

  @override
  int get hashCode {
    var _$hash = 0;
    _$hash = $jc(_$hash, reason.hashCode);
    _$hash = $jf(_$hash);
    return _$hash;
  }

  @override
  String toString() {
    return (newBuiltValueToStringHelper(r'TripsIdCancelPostRequest')
          ..add('reason', reason))
        .toString();
  }
}

class TripsIdCancelPostRequestBuilder
    implements
        Builder<TripsIdCancelPostRequest, TripsIdCancelPostRequestBuilder> {
  _$TripsIdCancelPostRequest? _$v;

  String? _reason;
  String? get reason => _$this._reason;
  set reason(String? reason) => _$this._reason = reason;

  TripsIdCancelPostRequestBuilder() {
    TripsIdCancelPostRequest._defaults(this);
  }

  TripsIdCancelPostRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _reason = $v.reason;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsIdCancelPostRequest other) {
    _$v = other as _$TripsIdCancelPostRequest;
  }

  @override
  void update(void Function(TripsIdCancelPostRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsIdCancelPostRequest build() => _build();

  _$TripsIdCancelPostRequest _build() {
    final _$result = _$v ??
        _$TripsIdCancelPostRequest._(
          reason: reason,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
