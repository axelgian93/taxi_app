// GENERATED CODE - DO NOT MODIFY BY HAND

part of 'trips_cancel_request.dart';

// **************************************************************************
// BuiltValueGenerator
// **************************************************************************

class _$TripsCancelRequest extends TripsCancelRequest {
  @override
  final String? reason;

  factory _$TripsCancelRequest(
          [void Function(TripsCancelRequestBuilder)? updates]) =>
      (TripsCancelRequestBuilder()..update(updates))._build();

  _$TripsCancelRequest._({this.reason}) : super._();
  @override
  TripsCancelRequest rebuild(
          void Function(TripsCancelRequestBuilder) updates) =>
      (toBuilder()..update(updates)).build();

  @override
  TripsCancelRequestBuilder toBuilder() =>
      TripsCancelRequestBuilder()..replace(this);

  @override
  bool operator ==(Object other) {
    if (identical(other, this)) return true;
    return other is TripsCancelRequest && reason == other.reason;
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
    return (newBuiltValueToStringHelper(r'TripsCancelRequest')
          ..add('reason', reason))
        .toString();
  }
}

class TripsCancelRequestBuilder
    implements Builder<TripsCancelRequest, TripsCancelRequestBuilder> {
  _$TripsCancelRequest? _$v;

  String? _reason;
  String? get reason => _$this._reason;
  set reason(String? reason) => _$this._reason = reason;

  TripsCancelRequestBuilder() {
    TripsCancelRequest._defaults(this);
  }

  TripsCancelRequestBuilder get _$this {
    final $v = _$v;
    if ($v != null) {
      _reason = $v.reason;
      _$v = null;
    }
    return this;
  }

  @override
  void replace(TripsCancelRequest other) {
    _$v = other as _$TripsCancelRequest;
  }

  @override
  void update(void Function(TripsCancelRequestBuilder)? updates) {
    if (updates != null) updates(this);
  }

  @override
  TripsCancelRequest build() => _build();

  _$TripsCancelRequest _build() {
    final _$result = _$v ??
        _$TripsCancelRequest._(
          reason: reason,
        );
    replace(_$result);
    return _$result;
  }
}

// ignore_for_file: deprecated_member_use_from_same_package,type=lint
